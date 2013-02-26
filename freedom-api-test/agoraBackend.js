// helloworld test
freedom.emit("helloworld", "Hello, World!  This is Agora from FreeDOM!");

// storage test
function StorageTest() {
}

StorageTest.prototype.set = function(value) {
	localStorage.storagetest = value;
}

StorageTest.prototype.get = function() {
	return localStorage.storageTest;
}

freedom.agoraBackend().provideSynchronous(StorageTest);
