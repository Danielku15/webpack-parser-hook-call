const { JAVASCRIPT_MODULE_TYPE_ESM } = require('webpack/lib/ModuleTypeConstants');


const PLUGIN_NAME = "MyPlugin";
class MyPlugin {
    apply(compiler) {
        console.log(`[${PLUGIN_NAME}] apply`);

        compiler.hooks.thisCompilation.tap(
            PLUGIN_NAME,
            (_, { normalModuleFactory }) => {
                console.log(`[${PLUGIN_NAME}] thisCompilation.tap`);

                const parserPlugin = (parser, parserOptions) => {
                    const syntax = ["WorkingClass", "NotWorkingClass", "Uint8Array"];

                    for (const item of syntax) {
                        console.log(`[${PLUGIN_NAME}] parser.hooks.new.for(${item}).tap`);
                        
                        parser.hooks.new.for(item).tap(PLUGIN_NAME, (expr) => {
                            console.log(`[${PLUGIN_NAME}] Found 'new ${item}' at location`, expr.loc);
                        });
                    }
                }

                normalModuleFactory.hooks.parser
                    .for(JAVASCRIPT_MODULE_TYPE_ESM)
                    .tap(PLUGIN_NAME, parserPlugin);
            })
    }
}

module.exports = {
    entry: {
        app: "./input.mjs",
    },
    output: {
        filename: "output.js"
    },
    plugins: [
        new MyPlugin()
    ]
};