import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}


export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	convert(str: string): string {
		let lines: string[] = str.split(/\r?\n/);
		lines = lines.filter(line => line.trim() !== '').map(line => { return line.replace(/- {3}/g, '- '); })
		return lines.join('\n');
	}

	async onload() {
		this.addCommand({
			id: 'convert-bike-to-obsidian',
			name: 'Convert bike outlines to obsidian format',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceSelection(this.convert(editor.getSelection()));
			}
		});
	}

	onunload() {

	}
}