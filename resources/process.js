(function () {

	if (!NodeList.prototype.forEach) { NodeList.prototype.forEach = Array.prototype.forEach; };

	var disabled = false;

	window.process = function () {

		if (disabled === true) return;
		disabled = true;

		var $d = {};
		document.querySelectorAll("body *[name]").forEach(function ($v) {
			if ($d[$v.name] === undefined) $d[$v.name] = ($v.type === "checkbox") ? [] : null;
			if ($v.checked === false) return;
			if ($v.type === "checkbox") {
				$d[$v.name].push($v.value);
			} else {
				$d[$v.name] = ($v.value === "") ? null : $v.value;
			};
		});

		var $e = validate($d);
		if ($e.length > 0) {

			alert("Please review:\n- " + $e.join("\n- "));
			disabled = false;

		} else {

			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) return;
				spinnerScreen.parentNode.removeChild(spinnerScreen);
				disabled = false;
				if (xhr.status !== 201) {
					alert("There has been an error with the submission. Please retry.");
				} else {
					var main = document.querySelector("main");
					main.style.textAlign = "center";
					main.textContent = "Submission successful";
				};
			};
			xhr.open("POST", "http://nigelgoss.co.uk/box/index.php", true);
			document.body.appendChild(spinnerScreen);
			xhr.send(JSON.stringify([
				location.href.split("/").slice(-1)[0].split(".")[0],
				location.hash.split("#")[1],
				$d
			]));

		};

	};

	var spinnerScreen
	window.addEventListener("load", function () {

		spinnerScreen = document.createElement("content");
		spinnerScreen.style.position = "absolute";
		spinnerScreen.style.top = "0";
		spinnerScreen.style.left = "0";
		spinnerScreen.style.width = "100%";
		spinnerScreen.style.height = "100%";
		spinnerScreen.onpointerdown = function () { event.preventDefault(); };
	
			var content = document.createElement("content"); spinnerScreen.appendChild(content);
			content.style.position = "fixed";
			content.style.top = "50%";
			content.style.left = "50%";
			content.style.transform = "translate(-50%,-50%)";
			
				var img = document.createElement("img"); content.appendChild(img);
				img.src = "resources/spinner.png";
				img.style.animation = "spin 1s linear infinite";

	});

}());
			