const fs = require('fs');

async function main() {
  const jsonUrl =
    'https://main--builder-prospect--sapudex.aem.page/aemedge/tagging-contenthub.json';

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };
  const helixJson = await fetchData(jsonUrl);

  const jcrJsonStr = `{
    "jcr:primaryType": "cq:Page",
    "jcr:content": {
        "sling:resourceType": "core/franklin/components/spreadsheet/v1/spreadsheet",
        "jcr:title": "Metadata",
        "cq:template": "/libs/core/franklin/templates/metadata",
        "jcr:mixinTypes": [
            "mix:versionable"
        ],
        "jcr:primaryType": "cq:PageContent"
    }
    }`;

  const jcrJson = JSON.parse(jcrJsonStr);
  const jcrJsonContent = jcrJson['jcr:content'];

  // get first row to get the column names
  const firstRow = helixJson.data[0];
  const columns = Object.keys(firstRow);
  jcrJsonContent.columns = columns;

  // map rows
  helixJson.data.forEach((element, index) => {
    const row = element;
    row['jcr:primaryType'] = 'nt:unstructured';

    jcrJsonContent[`row${index}`] = row;
  });

  const fileName = jsonUrl.split('/').pop().split('.').shift();
  fs.writeFileSync(`jcr/${fileName}.json`, JSON.stringify(jcrJson, null, 2));
}

main();
