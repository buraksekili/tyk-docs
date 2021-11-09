const https = require('https')

const tykConfigHeaderRegex = new RegExp('TYKCONFIGHEADERSTART\\nHEADER ([ \\w]+)\\n(.*)\\nTYKCONFIGHEADEREND', 's')

// Fetch config file from github repo
const fetchFile = async (path, branch) => new Promise(resolve => {
  https.get(`https://api.github.com/${path}${branch ? `?ref=${branch}` : ''}`, {
    headers: {
      'Authorization': `token ${process.env.TOKEN}`,
      'Accept': 'application/vnd.github.v3.raw',
      'User-Agent': 'request'
    }
  }, res => {
    const body = []
    res.on('data', chunk => body.push(chunk))
    res.on('end', () => resolve(Buffer.concat(body).toString()))
  })
})

// Get pumps folder from tyk-pump repo
const getPumpsFolder = async (branch) => {
  return new Promise(resolve => {
    https.get(`https://api.github.com/repos/TykTechnologies/tyk-pump/contents/pumps${branch ? `?ref=${branch}` : ''}`, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'request'
      }
    }, res => {
      const body = [], pumps = {}
      res.on('data', chunk => body.push(chunk))
      res.on('end', () => resolve(JSON.parse(Buffer.concat(body).toString())))
    })
  })
}

// Generate Markdown for the documentation
const generateMarkdown = (variables, mode) => {
  let markdown = "",
      configs = {},
      isConfig = 'config' === mode,
      description,
      match

  variables.forEach(item => configs[item.json] = item)

  Object.values(configs).forEach(item => {
    description = item.description
    if (!item.json.includes('-') && item.description) {
      if (description.includes('TYKCONFIGHEADERSTART')) {
        match = description.match(tykConfigHeaderRegex)

        markdown += `### ${match[1]}\n`
        const [description, oldAPIDefinition] = transformDescription({
          type: 'header',
          description: match[2],
        })
        markdown += `${description}\n\n`

        item.description = description.replace(match[0], '')
      }
      if ('variable' === item.flavour) {
        markdown += `### ${item.json}\n`
        if (isConfig) markdown += `EV: <b>${item.env}</b><br />\n`
        markdown += `Type: \`${item.type}\``
        if (item.required) markdown += ` - <b>required</b>`
        markdown += `<br />\n\n`
        const [description, oldAPIDefinition] = transformDescription(item)
        if (oldAPIDefinition) {
          markdown += `Old API Definition: ${oldAPIDefinition}\n\n`
        }

        markdown += `${description}\n\n`
      } else if ('header' === item.flavour) {
        markdown += `### ${item.json}\n`
        const [description, oldAPIDefinition] = transformDescription(item)
        if (oldAPIDefinition) {
          markdown += `Old API Definition: ${oldAPIDefinition}\n\n`
        }

        markdown += `${description}\n\n`
      }
    }
  })

  return markdown
}

const transformDescription = ({type, description, nested}) => {
  description = noteTransformer(description)

  if (nested) description = arrayObjectTransformer(type, nested, description)

  return extractOldAPIDefinitionFromDescription(description)
}

const OUT = 0
const IN = 1

const noteTransformer = description => {
  if (description.includes('Note:')) {
    let open = OUT, prev, d = ""

    description.split('\n').forEach(line => {
      if ('Note:' === line && OUT === open) {
        d += '{{< note success >}}\n**Note**\n\n'
        open = IN
      } else if (line.startsWith('  ')) d += line.slice(2) + '\n'
      else if (prev && !line.startsWith('  ') && prev.startsWith('  ') && IN === open) {
        d += '{{< /note >}}\n'
        open = OUT
      } else d += line + '\n'
      prev = line
    })

    if (prev.startsWith('  ') && IN === open) d += '{{< /note >}}'

    return d
  }

  return description
}

const arrayObjectTransformer = (type, nested, description) => {
  let d = `**${type.slice(2)} Object**\n` +
      '\n| Variable | Type | Key | Description |' +
      '\n| ----------- | ----------- | ----------- | ----------- |'

  nested.forEach(item => d += `\n| ${item.key} | ${item.type} | ${item.json} | ${item.description || ''} |`)

  return description + '\n\n' + d
}

const extractOldAPIDefinitionFromDescription = description => {
  const re = "Old API Definition: (.*)"
  const result = description.match(re)
  if (result) {
    description = description.replace(result[0], '')
  }

  return result ? [description, result[1]] :
      [description, ""]
}


module.exports = {
  fetchFile: fetchFile,
  getPumpsFolder: getPumpsFolder,
  generateMarkdown: generateMarkdown
}
