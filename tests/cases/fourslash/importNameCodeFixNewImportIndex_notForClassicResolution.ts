/// <reference path="fourslash.ts" />

// @moduleResolution: classic

// @Filename: /a/index.ts
////export const foo = 0;

// @Filename: /node_modules/x/index.d.ts
////export const bar = 0;

// @Filename: /b.ts
////[|foo;|]

// @Filename: /c.ts
////bar;

goTo.file("/a/index.ts");

goTo.file("/b.ts");
verify.importFixAtPosition([
`import { foo } from "./a/index";

foo;`
]);

// TODO: GH#20050 verify.not.codeFixAvailable();
goTo.file("/c.ts");
verify.importFixAtPosition([
`import { bar } from "./node_modules/x/index";

bar;
`]);
