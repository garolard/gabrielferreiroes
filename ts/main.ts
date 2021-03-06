///<reference path="sniptclient.ts" />
///<reference path="credentials.ts" />
///<reference path="promise.ts" />
///<reference path="declarations/jquery.d.ts" />
///<reference path="declarations/i18next.d.ts" />

// Necesario refacto brutal
function buildPosts(posts: Entities.Snipt[]): void {
    var postRowContainer: HTMLDivElement = document.createElement("div");
    postRowContainer.classList.add('row');
    var addedPosts: number = 0;

    for (var key in posts) {
        if (posts.hasOwnProperty(key)) {
            var element = posts[key];

            var container: HTMLDivElement = document.createElement("div");
            container.classList.add("post-resume");
            container.classList.add("col-lg-5");
            container.classList.add("col-lg-offset-1");
            container.classList.add("col-sm-6");

            var title: HTMLHeadingElement = document.createElement("h3");
            title.innerHTML = element.title;
            container.appendChild(title);

            var resume: HTMLParagraphElement = document.createElement("p");
            resume.innerHTML = element.code.length < 137 ? element.code : element.code.slice(0, 137);
            resume.innerHTML += '...';
            container.appendChild(resume);

            var linkToPost: HTMLAnchorElement = document.createElement("a");
            linkToPost.href = element.full_absolute_url;
            linkToPost.innerHTML = "Leer más";
            container.appendChild(linkToPost);

            if (addedPosts < 2)	{
                postRowContainer.appendChild(container);
                addedPosts++;
            } else {
                document.querySelector('div.post-resume-container').appendChild(postRowContainer);
                postRowContainer = document.createElement("div");
                postRowContainer.classList.add('row');
                postRowContainer.appendChild(container);
                addedPosts = 1;
            }
        }
    }

    // Agrego el último contenedor por si quedó con menos de 2 elementos
    document.querySelector('div.post-resume-container').appendChild(postRowContainer);
}

// Work-around
interface Navigator {
    globalization: any;
    interception: number;
}

document.addEventListener('DOMContentLoaded', (e) => {
	
    var lang:string[]   = [],
        locale          = "en";  // default

    // get the user's locale - mobile or web
    if (typeof navigator.globalization !== 'undefined') {
        // on mobile phone
        navigator.globalization.getLocaleName(
            function (loc) {locale = loc.value; },
            function () {console.log('Error getting locale\n'); }
        );
    } else {
        // in web browser
        lang = navigator.language.split("-");
        locale = lang[0];
    }
    console.log("locale: %s", locale);
    
    i18n.init({
       lng: locale,
       fallbackLng: 'en' 
    }, function (err, t) {
        $('body').i18n();
    });
        
    // i18n.init(function (err, t) {
    //     $('.nav').i18n();
    // });
    
	var client: SimpleSniptClient = new SimpleSniptClient(Credentials.ApiUser(), Credentials.ApiKey());
    client.getAllBlogPostsAsync().then((x: Entities.Snipt[]) => buildPosts(x));
	
});