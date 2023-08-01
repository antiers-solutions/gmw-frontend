declare module 'markdown-it' {
    import { PluginSimple } from 'markdown-it/lib';

    interface MarkdownIt {
        (): any;
        use(plugin: PluginSimple): MarkdownIt;
        render(md: string): string;
    }

    const markdownIt: MarkdownIt;
    export default markdownIt;
}
