<?php
class Chat extends Core {
    public function fetchMessages() {
        $this->query("
            SELECT  `messages`.`message`,
                    `utilisateurs`.`nom`,
                    `utilisateurs`.`id`
            FROM    `messages`
            JOIN    `utilisateurs`
            ON      `messages`.`id_utilisateur` = `utilisateurs`.`id`
            ORDER BY `messages`.`date`
            DESC
        ");

        return $this->rows();
    }

    public function throwMessage($user_id, $message) {
        $this->query("
            INSERT INTO `messages` (`id_utilisateur`, `message`, `date`)
            VALUES (" . (int)$user_id . ", '" .  $this->db->real_escape_string(htmlentities($message)) . "', UNIX_TIMESTAMP())        
        ");
    }
}