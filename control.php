<!DOCTYPE html>
<html>
	<head>
		<title>オンライン抽選機 - コントロールパネル</title>
	</head>
	<body>
		<h1>オンライン抽選機</h1>
		<h2>コントロールパネル</h2>
		
		<section>
			<h3>抽選結果</h3>
			<p id="result"></p> 
		</section>
		
		<section>
			<h3>抽選設定</h3>
			<p><input id="run_button" type="button" value="抽選!" /></p>
			<p>改行区切りで抽選リストを入力<br />もしくはファイルから読み込み</p>
			<p><input id="file_input" type="file" /></p>
			<textarea id="list_textarea" cols="100" rows="25" wrap="off"></textarea>
		</section>
		<script src="./js/send_list.js"></script>
	</body>
</html>
