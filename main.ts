import { Editor, MarkdownView, Plugin } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}


export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	convert(str: string): string {
		let lines: string[] = str.split(/\r?\n/);
		lines = lines.filter(line => line !== '').map(line => { return line.replace(/- {3}/g, '- '); })
		return lines.join('\n');
	}

	async onload() {
		this.addCommand({
			id: 'convert-bike-to-obsidian',
			name: 'Convert bike outlines to obsidian format',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const selection: string = editor.getSelection();
				if (selection.length) {
					editor.replaceSelection(this.convert(selection));
				}
				else {
					editor.setValue(this.convert(editor.getValue()));
				}
			}
		});
	}

	onunload() {

	}
}