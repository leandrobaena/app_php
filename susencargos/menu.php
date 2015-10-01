<?php

require_once (__DIR__ . "/../gen/bl/User.php");

session_start();


//Module m = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), 0, (EUser)Session["user"]);
//List<EModule> modules = m.modulesByUser(Int32.Parse(ConfigurationManager.AppSettings["app"].ToString()), ((EUser)Session["user"]).Iduser);
$out = "[";
/*$first = true;
foreach (EModule module in modules) {
    if ($first) {
        $first = false;
    } else {
        $out .= ",'-',";
    }
    $out .= "{text: '" + module . Name + "',iconCls:'" + module . _Class + "',menu:[";
    //Module sm = new Module(ConfigurationManager.ConnectionStrings["deprisa"].ToString(), module.Idmodule, (EUser)Session["user"]);
    //List<EModule> submodules = sm.submodulesByUser(Int32.Parse(ConfigurationManager.AppSettings["app"].ToString()), ((EUser)Session["user"]).Iduser);
    $firstSub = true;
    foreach (EModule submodule in submodules) {
        if ($firstSub) {
            $firstSub = false;
        } else {
            $out .= ",";
        }
        $out .= "{iconCls:'" + submodule . _Class + "',text:'" + submodule . Name + "',action:'" + submodule . Script + "'}";
    }
    $out .= "]}";
}
*/
//Alineación a derecha

$out .= "{text: 'Administración',iconCls:'app',menu:[";
$out .= "{iconCls:'apps',text:'Aplicaciones',action:'apps'}";
$out .= "]}";

$out .= ",'->'";

$out .= ",{text: '" . $_SESSION["user"]->name . "',iconCls:'app',menu:[";
$out .= "{iconCls:'password',text:'Cambiar contrase\\xf1a',action:'changePass'},";
$out .= "{iconCls:'logout',text:'Salir',action:'logout'}";
$out .= "]}";
$out .= "]";

echo($out);
?>