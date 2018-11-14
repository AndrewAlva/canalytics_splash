<?php
	$sender = "studio@mandelbrot.mx";
	$recipient = "andrew@mandelbrot.mx";
	$subject = "AC Green Ticket | Sponsorship Request";

	$name = $_POST['name'];
	$email = $_POST['email'];
	$tel = $_POST['tel'];

	$formcontent="Hey gents, this is a new user submitting their info to request sponsorship from advancedcanalytics.com; this is what they say:\n\nName: $name\nEmail: $email\nPhone: $tel.\n\n";
	$mailheader = "From: $sender \r\n";

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
