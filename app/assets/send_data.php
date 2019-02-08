<?php
	$recipient = "rh@advancedcanalytics.com, andrew@mandelbrot.mx";
	$subject = "AC Green Ticket | Sponsorship Request";

	$name = $_POST['name'];
	$email = $_POST['email'];
	$tel = $_POST['tel'];
	$state = $_POST['state'];
	$farmtype = $_POST['farmtype'];
	$farmsize = $_POST['farmsize'];
	$plants = $_POST['plants'];
	$growcycles = $_POST['growcycles'];
	$yields = $_POST['yields'];

	$formcontent="Hey gents, this is a new user submitting their info to request sponsorship from advancedcanalytics.com; this is what they say:\n\nName: $name\nEmail: $email\nPhone: $tel\nState: $state\nFarm type: $farmtype\nFarm size: $farmsize\nPlants count: $plants\nGrow cycles: $growcycles\nYields: $yields\n\n";
	$mailheader = "From: $email \r\n";

	// Write in the .txt file
	$new_subscriber = "Full name: $name, Phone: $tel, Email: $email"."\n";
	$file = fopen("ac_sponsor_requesters.txt", "r+") or die("Unable to open file!");
	fread($file,filesize("ac_sponsor_requesters.txt"));
	fwrite($file, $new_subscriber);
	fclose($file);
	echo("Subscriber data collected correctly.");

	// Send email with user data
	$mail_sent = mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
	if ($mail_sent == true){ ?>
		<script language="javascript" type="text/javascript">
			// alert('Great! Your message was sent successfully.');
			// window.location = '/';
			console.log('Great! Your message was sent successfully.');
		</script>

	<?php 
	} else {
	?>
		<script type="text/javascript">
			alert('There was an error and the message could not be sent, try again and if the error persists, try to reach us directly to bk@advancedcanalytics.com');
			window.location = '/';
		</script>
	
	<?php 
	}
?>
