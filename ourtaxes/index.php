<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Our Taxes</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <section class="header">
                    <header>
                        <div class="col-xs-2">
                            <img src="img7logo.png" />
                        </div>
                        <div class="col-xs-4">
                            <nav>
                                <ul class="list-inline">
                                    <li><a href="index.php">Inicio</a></li>
                                    <li><a href="profile.php">Perfil</li>
                                    <li><a href="reports.php">Reportes</li>
                                    <li><a href="account.php">Cuenta</li>
                                </ul>
                            </nav>
                        </div>
                        <?php if (!isset($_SESSION["user"])) { ?>
                            <div class="col-xs-6"><a href="cover.php">Iniciar sesi&oacute;n</a></div> <?php } else {
                            ?>
                            <div class="col-xs-6"><?php echo($_SESSION["user"]->name); ?>&nbsp;<a href="logout.php">Cerrar sesi&oacute;n</a></div> <?php }
                        ?>
                    </header>
                </section>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <section class="myTaxesReturn">
                        <div id="myTaxesReturn"></div>
                    </section>
                </div>
                <div class="col-xs-3">
                    <section class="stats">
                        <h1>OurTaxes</h1>
                        <hr />
                        <div id="stats">Estad&iacute;sticas</div>
                    </section>
                </div>
                <div class="col-xs-3">
                    <section class="video">
                        <div id="video">Video</div>
                    </section>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <section class="help">
                        <div id="help">Ayuda y medios de contacto</div>
                    </section>
                </div>
                <div class="col-xs-6">
                    <section class="news">
                        <h1>Noticias</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                            tempor sem ac neque iaculis egestas. Vestibulum eleifend
                            imperdiet enim a rutrum. Phasellus faucibus facilisis semper.
                            Nulla facilisi. Aenean posuere consequat magna, non sollicitudin
                            massa. Mauris ultricies dolor et eros elementum, non tristique
                            risus accumsan. Aenean consequat massa ut nisl elementum congue.
                            Aliquam lobortis metus vitae lectus interdum, id varius libero
                            sodales. Integer sit amet suscipit ex. Suspendisse faucibus id
                            urna eget rhoncus. Ut leo enim, eleifend vel risus et, dictum
                            condimentum leo.</p>
                    </section>
                </div>
            </div>
            <div class="row form-group">
                <section class="register">
                    <h1>Queremos conocerte...</h1>
                    <p>Para comenzar necesitas una cuenta de usuario, con esta cuenta te
                        identificar&aacute;s con nosotros y podr&aacute;s realizar todas
                        tus declaraciones.</p>
                    <div class="col-xs-6"><img src="imgRegister.png" /></div>
                    <div class="col-xs-6">
                        <div class="row">
                            <div class="col-xs-6">Nombre:</div>
                            <div class="col-xs-6"><input type="text" name="name" class="form-control"/></div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6">Correo:</div>
                            <div class="col-xs-6"><input type="email" name="email" class="form-control"/></div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6">Contrase&ntilde;a:</div>
                            <div class="col-xs-6"><input type="email" name="email" class="form-control"/></div>
                        </div>
                        <div class="row">
                            <div class="col-xs-6">&nbsp;</div>
                            <div class="col-xs-6"><input type="button" value="Siguiente" class="btn btn-default"/></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </body>
</html>
