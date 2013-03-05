freedom.emit("agora_getcurrentuser", agora_getCurrentUser);

function agora_getCurrentUser() {
	return {
		displayName: "Nicholas Cage",
		isOnline: true,
		UID: "cagen@cs.washington.edu",
		spaceNames: ["Final Project", "Design Team", "Cat Lovers Anonymous"]
	};
}
