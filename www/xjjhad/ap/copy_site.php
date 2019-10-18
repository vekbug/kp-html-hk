<form action="copy_site.php" method="post">
    <table>
        <tr>
            <td><label for="domain">域名目录</label></td>
            <td><input id="domain" type="text" name="domain" style="width: 500px;" value="<?php echo $_POST['domain']; ?>"></td>
        </tr>
        <tr>
            <td><label for="copy_right">版权</label></td>
            <td><input id="copy_right" type="text" name="copy_right" style="width: 500px;" value="<?php echo $_POST['copy_right']; ?>"></td>
        </tr>
        <tr>
            <td><label for="stat_code">统计代码</label></td>
            <td><input id="stat_code" type="text" name="stat_code" style="width: 500px;" value="<?php echo htmlentities($_POST['stat_code']); ?>"></td>
        </tr>
        <tr>
            <td><input type="hidden" name="commit" id="commit" value="1"></td>
            <td><button>提交</button></td>
        </tr>
    </table>
</form>
<?php
if (!isset($_POST['commit']) || $_POST['commit'] <> 1) {
    exit;
}
$d = $_POST['domain'];
$c = $_POST['copy_right'];
$s = $_POST['stat_code'];
$target_dir = dirname(__DIR__) . '/' . $d . '/';
if (empty($d)) {
    exit('域名目录不能为空');
}
if (empty($s)) {
    exit('统计代码不能为空');
}
if (empty($c)) {
    exit('版权不能为空');
}
if (!empty($d) && !is_dir($target_dir)) {
    exit('域名目录不存在');
}
chmod($target_dir, '0777');
// 防止重复copy
$target_about_html = $target_dir . 'about.html';
if (file_exists($target_about_html)) {
    exit('目标文件已存在，不允许覆盖原文件');
}
foreach (glob('*') as $item) {
    $source = $item;
    $target = $target_dir . $item;
    if (is_dir($source)) {
        $result = copy_dir($source, $target) ? ' <span style="color:green">成功</span>' : ' <span style="color:red">失败</span>';
        echo '复制目录：' . $source . ' -> ' . $target . $result . '<br>';
    } else {
        $result = copy($source, $target) ? ' <span style="color:green">成功</span>' : ' <span style="color:red">失败</span>';
        $content = file_get_contents($source);
        replace_copy_right($content, $c);
        replace_stat_code($content, $s);
        file_put_contents($target, $content);
        echo '复制文件：' . $source . ' -> ' . $target . $result . '<br>';
    }
}

function copy_dir($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst);
    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' )) {
            if ( is_dir($src . '/' . $file) ) {
                copy_dir($src . '/' . $file, $dst . '/' . $file);
                continue;
            } else {
                $result = copy($src . '/' . $file, $dst . '/' . $file);
                if (!$result) {
                    closedir($dir);
                    return false;
                }
            }
        }
    }
    closedir($dir);
    return true;
}

function replace_copy_right (&$content, $copy_right) {
    $content = preg_replace('|深圳市东企科技有限公司|', $copy_right, $content);
}

function replace_stat_code (&$content, $stat_code) {
    $content = preg_replace('|<script [^>]+cnzz.com[^>]+>.*?</script>|', $stat_code, $content);
}