///<reference path="entities.ts" />
///<reference path="promise.ts" />

interface ISniptClient {
	getAllBlogPostsAsync(): MPromise<Entities.Snipt[]>;
}

class SimpleSniptClient implements ISniptClient {
    
    blogPosts: Entities.Snipt[];
    host: string;
    scope: string;
    request: string;
    
    constructor(private username: string, private apiKey: string) {
        this.username = username;
        this.apiKey = apiKey;
        this.host = "https://snipt.net/api";
        this.scope = "private";
    }
    
    public getAllBlogPostsAsync(): MPromise<Entities.Snipt[]> {
        
        var resultPromise: MPromise<Entities.Snipt[]> = new MPromise<Entities.Snipt[]>();
        
        var requestUrl: string = this.host;
			requestUrl += '/';
			requestUrl += this.scope;
			requestUrl += '/snipt'; // Refacto here
			requestUrl += '/?';
			requestUrl += 'username=';
			requestUrl += this.username;
			requestUrl += '&api_key=';
			requestUrl += this.apiKey;
			requestUrl += '&format=json';
		
		
        var xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onreadystatechange = (ev) => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                
                var posts: Entities.Snipt[] = [];
                var elementsToRemove: number[];
                for (var p in response.objects) {
                    if (response.objects.hasOwnProperty(p)) {
                        var element: Entities.Snipt = response.objects[p];
                        
                        if (element.blog_post) {
                            posts.push(element);
                        }
                    }
                }
                
                resultPromise.validate(posts);
            }
        }
        xhr.onerror = (ev) => {
            resultPromise.reject(new Error("Error ejecutando la petición HTTP"));
        }
        
        xhr.open('GET', requestUrl, true);
        xhr.send(null);
        		
		return resultPromise;
        
    }
    
}