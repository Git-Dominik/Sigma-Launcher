export namespace main {
	
	export class ApiGame {
	    id: number;
	    name: string;
	    cover: number;
	
	    static createFrom(source: any = {}) {
	        return new ApiGame(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.cover = source["cover"];
	    }
	}
	export class Game1337x {
	    Title: string;
	    Uploader: string;
	    Downloads: number;
	    Date: string;
	    Magnet: string;
	
	    static createFrom(source: any = {}) {
	        return new Game1337x(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Title = source["Title"];
	        this.Uploader = source["Uploader"];
	        this.Downloads = source["Downloads"];
	        this.Date = source["Date"];
	        this.Magnet = source["Magnet"];
	    }
	}
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
	export class Image {
	    url: string;
	
	    static createFrom(source: any = {}) {
	        return new Image(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	    }
	}

}

