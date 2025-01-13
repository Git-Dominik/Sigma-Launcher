export namespace main {
	
	export class GameData {
	    Name: string;
	    Progress: number;
	    Speed: number;
	
	    static createFrom(source: any = {}) {
	        return new GameData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Progress = source["Progress"];
	        this.Speed = source["Speed"];
	    }
	}

}

