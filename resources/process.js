(function () {

	if (!NodeList.prototype.forEach) { NodeList.prototype.forEach = Array.prototype.forEach; };

	var disabled = false;

	window.process = function () {

		if (disabled === true) return;
		disabled = true;

		var $d = {};
		document.querySelectorAll("*[name]").forEach(function ($v) {
			if ($d[$v.name] === undefined) $d[$v.name] = ($v.type === "checkbox") ? [] : null;
			if ($v.checked === false) return;
			if ($v.checked === true) {
				$d[$v.name].push($v.value);
			} else {
				$d[$v.name] = ($v.value === "") ? null : $v.value;
			};
		});

		var $e = validate($d);
		if ($e.length > 0) {

			alert("Errors:\n- " + $e.join("\n- "));
			disabled = false;

		} else {

			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState !== 4) return;
				disabled = false;
				if (xhr.status !== 200) {
					alert("There has been an error with the submission. Please retry.");
				} else {
					location.href = ".";
				};
			};
			xhr.open("GET", ".", true);
			xhr.send();

			console.log(JSON.stringify([location.hash.split("#")[1], $d]));

		};

	};

}());