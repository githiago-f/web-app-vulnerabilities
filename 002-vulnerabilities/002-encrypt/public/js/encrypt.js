const encryptMessage = async (message, publicKey) => {
	let enc = new TextEncoder();
	let encoded = enc.encode(message);

	const str2ab = (str) => {
		const buf = new ArrayBuffer(str.length);
		const bufView = new Uint8Array(buf);
		for (let i = 0, strLen = str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	}
	const arrayBufferToBase64 = (buffer) => {
		var binary = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return btoa(binary);
	}

	const importKeyMethod = async () => {
		const pemHeader = "-----BEGIN PUBLIC KEY-----";
		const pemFooter = "-----END PUBLIC KEY-----";
		const pemContents = (publicKey.substring(pemHeader.length, publicKey.length - (pemFooter.length+1)));
		console.log(pemContents);
		const clearPublicKey = atob(pemContents);
		const binaryDer = str2ab(clearPublicKey);
		return await window.crypto.subtle.importKey(
			'spki',
			binaryDer,
			{
				name: "RSA-OAEP",
				modulusLength: parseInt(
					document.getElementById('modulus_value').value),
				hash: "SHA-256",
			},
			true,
			['encrypt']
		);
	}
	const encryptMessage = async () => {
		const importedKey = await importKeyMethod();
		return window.crypto.subtle.encrypt(
			{
				name: "RSA-OAEP",
			},
			importedKey,
			encoded
		);
	}

	return arrayBufferToBase64(await encryptMessage())
}

async function encryptText() {
	const message = document.getElementById('to_encrypt');
	const key = document.getElementById('public_key');
	document.getElementById('enc_message').value = 
		await encryptMessage(message.value, key.value);
}
