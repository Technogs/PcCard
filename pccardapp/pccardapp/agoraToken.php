<?php
require 'agoraSrc/RtcTokenBuilder.php';
       
        if(!isset($_GET['cnam'])  && !empty($_GET['cnam'])){
            $return['msg'] = 'please Send required field';
            echo json_encode($return);
            return true;
        }
        $userId = '';/// $_GET['uid'];
        // $appId = "30565fe82361456d85800fd8b9b492d2";
        $appID = "30565fe82361456d85800fd8b9b492d2";
        $appCertificate = "bbcf0c078d6e4abab5f8e63188c74990";
        $channelName = $_GET['cnam'];

        $uid = $userId;
        $uidStr = "$userId";
        $role = RtcTokenBuilder::RoleAttendee;
        $expireTimeInSeconds = 3600;
        $currentTimestamp = (new DateTime("now", new DateTimeZone('UTC')))->getTimestamp();
        $privilegeExpiredTs = $currentTimestamp + $expireTimeInSeconds;

        $token = RtcTokenBuilder::buildTokenWithUid($appID, $appCertificate, $channelName, $uid, $role, $privilegeExpiredTs);
        // echo 'Token with int uid: ' . $token . PHP_EOL;

        $token = RtcTokenBuilder::buildTokenWithUserAccount($appID, $appCertificate, $channelName, $uidStr, $role, $privilegeExpiredTs);
        // echo 'Token with user account: ' . $token . PHP_EOL;

        $token = RtcTokenBuilder::buildTokenWithUidAndPrivilege($appID, $appCertificate, $channelName, $uid,
                                                                        $privilegeExpiredTs, $privilegeExpiredTs,
                                                                        $privilegeExpiredTs, $privilegeExpiredTs);
        // echo 'Token with user uid user defined privilege: ' . $token . PHP_EOL;

        $token = RtcTokenBuilder::buildTokenWithUserAccountAndPrivilege($appID, $appCertificate, $channelName, $uidStr,
                                                                            $privilegeExpiredTs, $privilegeExpiredTs,
                                                                            $privilegeExpiredTs, $privilegeExpiredTs);
       
        $return['msg'] = 'Agora Token successfully created';
        $return['success'] = 1;
        $return['token'] = $token;
        $return['channelName'] = $channelName;
        echo json_encode($return);
        return true;
?>