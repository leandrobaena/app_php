<script>
    function tracking() {
        var package = document.getElementById('package').value;
        if (package == "") {
            alert("Ingrese el número de la remesa que desea consultar");
        } else {
            if (isNaN(package)) {
                alert("Ingrese el número de la remesa que desea consultar");
            } else {
                window.location = "tracking.php?package=" + package;
            }
        }
    }
</script>
<img class="draggable editable" src="images/logo_Susencargos.JPG" alt="logo_Susencargos.JPG" onmousedown="return false;" style="position: absolute; top: 100px; left: 27px; z-index: 102; visibility: visible; height: 166px; width: 211px; border-width: 0px;" id="ESW_GEN_ID_0" eswid="ESW_GEN_ID_0" isflashingnow="0" ismarknow="0" cached_border="none|rgb(0, 0, 0)|0px|" oncontextmenu="return false;" />
<div id="ESWuserMenuPosition" style="overflow: visible; position: absolute; z-index: 9999; top: 279px; left: 2px; ">
    <div style="position: static;" id="ESWuserMenu">
        <a style="position: relative; text-decoration: none; border: none;" class="ESWuserButtonActive" href="index.php">
            <div id="menuButton_797" class="ESWuserButton0" title="Inicio">Inicio</div>
        </a>
        <a style="position: relative; text-decoration: none; border: none;" class="" href="empresa.php">
            <div id="menuButton_5769" class="ESWuserButton0" title="Empresa">Empresa</div>
        </a>
        <a style="position: relative; text-decoration: none; border: none;" class="" href="servicios.php">
            <div id="menuButton_6177" class="ESWuserButton0" title="Servicios">Servicios</div>
        </a>
        <a style="position: relative; text-decoration: none; border: none;" class="" href="contactenos.php">
            <div id="menuButton_6324" class="ESWuserButton0" title="Contáctenos">Cont&aacute;ctenos</div>
        </a>
        <a style="position: relative; text-decoration: none; border: none;" class="" href="packages.php">
            <div class="ESWuserButton0" title="Ingrese sus gu&iacute;as">Ingrese sus gu&iacute;as</div>
        </a>
        <a style="position: relative; text-decoration: none; border: none;">
            <div class="boxTracking">
                Consulte el estado de su gu&iacute;a<br />
                <input type="text" id="package" />&nbsp;
                <input type="button"value="Consultar" onclick="tracking()" />
            </div>
        </a>
    </div>
</div>