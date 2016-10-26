
<!-- Controller coming from routing rules for now -->
<body>
{{countdown}}
<form name="searchUser" ng-submit="search(username)">
<label for="search">Username:</label>
<input type="search" id="search" required="" placeholder="Username to find..." ng-model="username" />
<input type="submit" value="Search" />
</form>
</body>