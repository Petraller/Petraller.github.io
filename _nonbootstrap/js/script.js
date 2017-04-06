//Now you're looking at my JavaScript too!

var bannerUpdater = null;

var banner = {
    dom: null,
    step: 0,

    content: [
        {
            text: "Hi",
            size: 4,
            duration: 1000
        },
        {
            text: "Welcome to the home of <span class='highlight'>Petraller</span>",
            size: 2,
            duration: 3000
        },
        {
            text: "I make games and <span class='rainbow'>cool</span> stuff",
            size: 2,
            duration: 3000
        },
        {
            text: "Enjoy your stay",
            size: 3,
            duration: 3000
        },
        {
            text: ":)",
            size: 4,
            duration: 3000
        }
    ],

    init: function ()
    {
        banner.dom = document.getElementById('banner');
        banner.step = 0;
        bannerUpdater = window.setTimeout(function ()
        {
            banner.next();
        }, 1500);
        banner.dom.onmousedown = function ()
        {
            if (bannerUpdater !== null)
                window.clearTimeout(bannerUpdater);
            banner.next();
        }
    },

    next: function ()
    {
        var animDuration = 1000;

        $('.bannerText').animate(
            {
                top: '-50%',
                opacity: '0',
            },
            {
                duration: animDuration,
                easing: 'easeInBack',
                complete: function ()
                {
                    $(this).remove();
                },
            }
        );

        var newBannerText = document.createElement("div");
        newBannerText.style.position = "absolute";
        newBannerText.style.left = '10%';
        newBannerText.style.right = '10%';
        newBannerText.style.top = '150%';
        newBannerText.style.transform = 'translateY(-50%)';
        newBannerText.style.textAlign = 'center';
        newBannerText.style.opacity = '0';
        newBannerText.innerHTML = '<p style="font-size:' + banner.content[banner.step].size + '00%">'
            + banner.content[banner.step].text
            + '</p>';
        if (banner.dom !== null)
            banner.dom.appendChild(newBannerText);
        $(newBannerText)
            .addClass('bannerText')
            .animate(
                {
                    top: '50%',
                    opacity: '1',
                },
                {
                    duration: animDuration,
                    easing: 'easeOutBack',
                }
            );

        bannerUpdater = window.setTimeout(function ()
        {
            banner.next();
        }, banner.content[banner.step].duration + animDuration * 2);
        banner.step = (banner.step + 1) % banner.content.length;
    }
};

function init()
{
    generateLayout();
    banner.init();
}

function generateLayout()
{
    createHead();
    createHeader();
    createFooter();
}

function scrollTo(name)
{
    var target = $("a[name='" + name + "'");
    $('html, body').animate({
        scrollTop: target.offset().top - $('body').offset().top - $("header").height()
    }, 500);
}

function updateTitle()
{
    $("title").html("Petraller - " + name);
}

function createHead()
{
    var toAppend = '<link rel="shortcut icon" type="image/ico" href="favicon.ico"> ' +
        '<meta charset="UTF-8"> ' +
        '<title>Petraller - error</title> ' +
        '<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900,300italic,400italic,700italic,900italic" ' +
        'rel="stylesheet" type="text/css">';
    $("head").append(toAppend);

    updateTitle();
}

function createHeader()
{
    var toPrepend = '<header> ' +
        '<div> ' +
        '<a href=""> ' +
        '<img id="logo" src="img/petraller_studios.png" title="Petraller Studios" alt="Petraller Studios logo"> ' +
        '</a> ' +
        '<nav class="md lg"> ' +
        '</nav> ' +
        '</div> ' +
        '</header>';
    $("body").prepend(toPrepend);

    $("a.anchor").each(function ()
    {
        var name = $(this).attr("name");
        var toAppend = '<div class="navLink">' + name + '</div>';
        $("header nav").append(toAppend);
    });

    $(".navLink").on("mousedown", function ()
    {
        scrollTo(this.innerHTML);
    });
}

function createFooter()
{
    var str;
    var start = 2016;
    var now = new Date();
    if (now.getFullYear() === start)
    {
        str = start;
    }
    else
    {
        str = start + " - " + now.getFullYear();
    }
    var toAppend = '<footer> ' +
        '<div>Copyright &copy; ' + str + ' Clarence "Petraller" Tay</div> ' +
        '</footer>';
    $("body").append(toAppend);
}

var name = "404";

window.onload = function ()
{
    init();
};