# VSCode snippets

> VScode 에서 사용하고 있는 스니펫.

## For TSX files

### Console Log

```js
"cl": {
  "prefix": "cl",
  "body": [
    "console.log('===== $TM_FILENAME_BASE', $1);"
  ]
},
```

### ESLint Disable Next Line

```js
"esline-disable-next-line": {
  "prefix": "eslint-disable-next-line",
  "body": [
    "// eslint-disable-next-line"
  ]
},
```

### TSX Functional Component

```js
"rfc": {
  "prefix": "rfc",
  "body": [
    "import React from 'react';",
    "",
    "interface ${TM_FILENAME_BASE}Props {",
    "",
    "}",
    "",
    "const $TM_FILENAME_BASE: React.FC<${TM_FILENAME_BASE}Props> = ({  }) => {",
    "  return (",
    "    <div>",
    "      Hello $TM_FILENAME_BASE",
    "    </div>",
    "  )",
    "}",
    "",
    "export default $TM_FILENAME_BASE;",
    ""
  ]
},
```

### TSX Preact Functional Component

```js
"fc": {
  "prefix": "fc",
  "body": [
    "import { h, FunctionalComponent } from 'preact';",
    "import './${TM_FILENAME_BASE}.scss';",
    "",
    "export interface ${TM_FILENAME_BASE}Props {",
    "",
    "}",
    "",
    "const $TM_FILENAME_BASE: FunctionalComponent<${TM_FILENAME_BASE}Props> = ({  }) => {",
    "  return (",
    "    <div>",
    "      Hello $TM_FILENAME_BASE",
    "    </div>",
    "  )",
    "}",
    "",
    "export default $TM_FILENAME_BASE;",
    ""
  ]
},
```

### Storybook React

```js
"storyreact": {
  "prefix": "storyreact",
  "body": [
    "import React from 'react';",
    "import { Story, Meta } from '@storybook/react';",
    "import ${TM_FILENAME_BASE/(.*)\\..+$/$1/}, { ${TM_FILENAME_BASE/(.*)\\..+$/$1/}Props } from './${TM_FILENAME_BASE/(.*)\\..+$/$1/}';",
    "",
    "export default {",
    "  title: 'Elements/${TM_FILENAME_BASE/(.*)\\..+$/$1/}',",
    "  component: ${TM_FILENAME_BASE/(.*)\\..+$/$1/},",
    "  argTypes: {",
    "    ",
    "  }",
    "} as Meta;",
    "",
    "const Template: Story<${TM_FILENAME_BASE/(.*)\\..+$/$1/}Props> = (args) => <${TM_FILENAME_BASE/(.*)\\..+$/$1/} {...args} />",
    "",
    "export const Default = Template.bind({});",
    "Default.args = {",
    "  ",
    "}"
  ]
}
```

## For TS files

### Custom Hooks

```js
"hooks": {
  "prefix": "hooks",
  "body": [
    "interface ${TM_FILENAME_BASE/(^[a-z])/${1:/upcase}/}<S> {",
    "  ",
    "}",
    "",
    "export default <S>({  }: ${TM_FILENAME_BASE/(^[a-z])/${1:/upcase}/}<S>) => {",
    "  ",
    "  return {",
    "    ",
    "  };",
    "}",
  ]
}
```

## For HTML files

```js
"html": {
  "prefix": "html-default",
  "body": [
    "<!DOCTYPE html>",
    "<html lang=\"en\">",
    "  <head>",
    "    <title>Title</title>",
    "    <meta charset=\"utf-8\" />",
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">",
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no\">",
    "    <meta name=\"description\" content=\"\">",
    "    <meta name=\"keywords\" content=\"\">",
    "    <meta property=\"og:title\" content=\"\">",
    "    <meta property=\"og:site_name\" content=\"\">",
    "    <meta property=\"og:type\" content=\"website\">",
    "    <meta property=\"og:url\" content=\"\">",
    "    <link rel=\"stylesheet\" href=\"style.css\">",
    "    <link rel=\"shortcut icon\" href=\"favicon.ico\">",
    "  </head>",
    "  <body>",
    "    Hello world",
    "  </body>",
    "</html>",
  ]
},
```