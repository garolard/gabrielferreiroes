document.addEventListener('DOMContentLoaded', function(ev) {
	var client = new Client.SniptClient('Garolard', '24906c869cfbb3422b111a4639707d0523389cce', 'div.post-resume-container');
	client.GetAllPosts();
});