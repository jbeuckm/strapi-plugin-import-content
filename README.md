# Strapi Import Content plugin

Import RSS items to your content type with Strapi.

[![Build Status](https://dev.azure.com/joebeuckman0156/Strapi%20Plugins/_apis/build/status/jbeuckm.strapi-plugin-import-content?branchName=master)](https://dev.azure.com/joebeuckman0156/Strapi%20Plugins/_build/latest?definitionId=1&branchName=master)

### Installation

```
cd my-strapi-project/plugins
git clone https://github.com/jbeuckm/strapi-plugin-import-content.git import-content
cd import-content && npm install
cd ../..
npm run setup --plugins
```

_\* the last step takes a notoriously long time..._

### Configuration

When plugin has been installed, you need to allow access to the endpoints.

1.  Navigate to Users & Permissions.
2.  Pick the role you would like to give permission.
3.  Scroll down and expand the section **Import Content**.
4.  Check "Select All" for the endpoints under "Importconfig".
5.  Scroll up and press "Save"

### Usage

Click for video demo:
[![Click for demo video](video_thumbnail.png)](https://youtu.be/NOFioYMKPJk)
