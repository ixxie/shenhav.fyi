export interface Tool {
	name: string;
	onclick: () => void;
}

export interface ToolbarContext {
	mode: string | null;
}
