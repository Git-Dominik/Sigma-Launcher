export namespace main {
	
	export class Game {
	    appid: number;
	    playtime: number;
	    achievments: number[];
	    executable: string;
	
	    static createFrom(source: any = {}) {
	        return new Game(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.appid = source["appid"];
	        this.playtime = source["playtime"];
	        this.achievments = source["achievments"];
	        this.executable = source["executable"];
	    }
	}

}

