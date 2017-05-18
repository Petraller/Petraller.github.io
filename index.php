<!DOCTYPE html>
<html lang="en">
<head>
    <?php require_once "./includes/head.php" ?>
</head>
<body>
<?php require_once "./includes/header.php" ?>
<div id="content" role="main">
    <section id="banner" role="presentation">
        <div id="banner-top"></div>
    </section>
    <div id="fixed-width" role="document">
        <section id="about">
            <div class="section-heading section-part-1">
                <h1>About</h1>
            </div>
            <div class="section-content section-part-3">
                <p>
                    My name is <span class="highlight">Clarence "Petraller" Tay</span>.
                    <br><br>
                    I am a software developer from Singapore,
                    studying as a full-time student for a Diploma in Game Design and Development.
                    I develop and publish content under the online persona "<span class="highlight">Petraller</span>".
                    <br><br>
                    Besides software development,
                    I also do web development, video editing, dance, 3D animation,
                    and more.
                    <br><br>
                </p>

                <a href="./files/Resume.pdf">
                    <div class="button"><p>View/Download My CV</p></div>
                </a>
            </div>
        </section>
        <section id="contact">
            <div class="section-heading section-part-1">
                <h1>Contact</h1>
            </div>
            <div class="section-content section-part-3">
                <h2>Email</h2>

                <p>
                    me@petraller.com
                    <br>
                    petraller@gmail.com
                </p>
            </div>
            <div class="section-content section-part-1"></div>
            <div class="section-content section-part-1">
                <h2>Twitter</h2>

                <p>
                    @petraller
                </p>
            </div>
            <div class="section-content section-part-1">
                <h2>Instagram</h2>

                <p>
                    @petralleryt
                </p>
            </div>
        </section>
        <section id="skills">
            <div class="section-heading section-part-1">
                <h1>Skills &amp; Tech</h1>
            </div>
            <div class="section-content section-part-3">
                <h2>Languages</h2>

                <div id="marquee-language" class="marquee" role="marquee"></div>
                <h2>Frameworks &amp; Libraries</h2>

                <div id="marquee-framework" class="marquee" role="marquee"></div>
                <h2>Programs</h2>

                <div id="marquee-program" class="marquee" role="marquee"></div>
                <br>

                <p>Hover over an item to learn more.</p>
            </div>
        </section>
        <section id="games">
            <div class="section-heading section-part-1">
                <h1>Games</h1>
            </div>
        </section>
    </div>
</div>
<?php require_once "./includes/footer.php" ?>
</body>
</html>