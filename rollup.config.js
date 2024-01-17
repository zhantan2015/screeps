import clear from 'rollup-plugin-clear';
import typescript from 'rollup-plugin-typescript2';
// 告诉 rollup 他要打包什么
export default {
    // 源代码的入口是哪个文件
    input: 'src/main.ts',
    // 构建产物配置
    output: {
        // 输出到哪个文件
        file: 'default/main.js',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        clear({ targets: ["default"] }),
        typescript({ tsconfig: "./tsconfig.json" })
    ]
};