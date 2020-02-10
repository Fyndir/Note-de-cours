<?php
require '../core/init.php';

if (isset($_POST['method']) === true && empty($_POST['method']) === false) {
    $chat   = new Chat();
    $method = trim($_POST['method']);

    if($method === 'recuperer') {
        $messages = $chat->fetchMessages();

        if(empty($messages) === true) {
            echo "Il n'y a aucun message dans le chat";
        } else  {
            foreach($messages as $message) {
            ?>
                <div class="message">
                    <a><?php echo $message['nom']; ?></a> dit :
                    <p><?php echo nl2br($message['message']); ?></p>
                </div>
            
            <?php
            }
        }
    } else if ($method === 'poster' && isset($_POST['message']) === true) {
        $message = trim($_POST['message']);

        if (empty($message) === false) {
            $chat->throwMessage($_POST['user_id'], $message);
        }
    }
}
