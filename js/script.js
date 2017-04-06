// Now you're looking at my JavaScript too!

var bannerUpdater = null;

var banner = {
    dom: null,
    step: 0,
    clicks: 0,

    // General auto-scroll content
    content: [
        {
            text: "Hi",
            size: 4,
            duration: 1000
        },
        {
            text: "I'm <span class='highlight'>Petraller</span>",
            size: 2,
            duration: 3000
        },
        {
            text: "I develop games and <span class='rainbow'>cool</span> stuff",
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
        },
        {
            text: "",
            size: 1,
            duration: 0
        }
    ],

    // On-click content
    contentSpecial: [
        /*'<p style="font-size:150%">Do you like interactive things?</p>',
        '<p style="font-size:150%">I like making interactive things.</p>',
        '<p style="font-size:150%">How about we create interactive things together?</p>',
        '<p style="font-size:150%">Drop me an email at me@<span class="highlight">petraller.com</span></p>',*/
    ],

    init: function ()
    {
        banner.dom = document.getElementById('banner');
        banner.step = 0;
        bannerUpdater = window.setTimeout(function ()
        {
            banner.next();
        }, 1500);
        if (banner.dom)
        {
            banner.dom.onmousedown = function ()
            {
                banner.click();
            }
        }
    },

    next: function ()
    {
        var animDuration = 1000;

        // Exit
        $('.bannerText')
            .removeClass('bannerText')
            .clearQueue()
            .animate(
                {
                    top: '-50%',
                },
                {
                    duration: animDuration,
                    easing: 'easeInOutCubic',
                    complete: function ()
                    {
                        $(this).remove();
                    },
                }
            );

        // Enter
        var newBannerText = document.createElement("div");
        newBannerText.style.position = "absolute";
        newBannerText.style.left = '10%';
        newBannerText.style.right = '10%';
        newBannerText.style.top = '150%';
        newBannerText.style.transform = 'translateY(-50%)';
        newBannerText.style.textAlign = 'center';
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
                },
                {
                    duration: animDuration,
                    easing: 'easeInOutCubic',
                }
            );

        // Timer
        bannerUpdater = window.setTimeout(function ()
        {
            banner.next();
        }, banner.content[banner.step].duration + animDuration * 2);
        banner.step = (banner.step + 1) % banner.content.length;
    },

    click: function ()
    {
        banner.clicks++;
        // Every 10 clicks
        var index = Math.ceil(banner.clicks / 10);
        if (banner.clicks >= index * 10 && index <= banner.contentSpecial.length)
        {
            // If click with index does not exist
            if ($('#clicks-' + index.toString()).length == 0)
            {
                // Enter
                var newBannerText = document.createElement("div");
                newBannerText.style.position = "absolute";
                newBannerText.style.left = '5%';
                newBannerText.style.bottom = '-10%';
                newBannerText.style.textAlign = 'left';
                newBannerText.id = 'clicks-' + index.toString();
                newBannerText.innerHTML = banner.contentSpecial[index - 1];
                if (banner.dom !== null)
                    banner.dom.appendChild(newBannerText);
                $(newBannerText).animate({
                    bottom: '5%',
                }, {
                    easing: 'easeOutCirc',
                    duration: 1000,
                });

                // Exit
                if (index > 1)
                {
                    $('#clicks-' + (index - 1).toString())
                        .animate({
                            bottom: '110%',
                        }, {
                            easing: 'easeInCirc',
                            duration: 1000,
                            complete: function ()
                            {
                                $(this).remove();
                            },
                        });
                }
            }

            // Add new banner content once clicks content is finished
            //if (index == banner.contentSpecial.length)
            //{
            //    var last = banner.content.pop();
            //    banner.content.push({
            //        text: "Really, feel free get in touch",
            //        size: 2,
            //        duration: 3000
            //    }, {
            //        text: "For any reason",
            //        size: 2,
            //        duration: 3000
            //    }, {
            //        text: "me@<span class='highlight'>petraller.com</span>",
            //        size: 2,
            //        duration: 3000
            //    }, last);
            //}
        }

        if (bannerUpdater !== null)
            window.clearTimeout(bannerUpdater);
        banner.next();
    },
};

var games = {
    url: 'games.xml',

    // Load games from xml using ajax
    load: function ()
    {
        $.ajax({
            url: games.url,
            method: "GET",
            success: function (e)
            {
                $("#expandGames").empty();

                if ($(e).find("game").length <= 0)
                {
                    $("#expandGames").append('<p>Whoops! Something went wrong. The content could not be loaded.</p>');
                    return;
                }

                $(e).find("game").each(function (index)
                {
                    // Add divider if not first
                    if (index !== 0)
                    {
                        $("#expandGames").append('<div class="divider"></div>');
                    }

                    // Create list of roles
                    var roles = '';
                    $(this).find("role").each(function (index)
                    {
                        roles += '<li><p>';
                        roles += $(this).text();
                        roles += '</p></li>';
                    });

                    // Create list of links
                    var url = '';
                    var links = '';
                    $(this).find("link").each(function (index)
                    {
                        if (index === 0)
                            url = $(this).find("url").text();
                        links += '<br>';
                        links += '<a href="' + $(this).find("url").text() + '">';
                        links += '<button class="button">' + $(this).find("text").text() + '</button>';
                        links += '</a>';
                        links += '<br>';
                    });

                    // Append games to section
                    var toAppend =
                        '<div class="row">' +
                        '<div class="col-xs-12 col-md-6 col-lg-8">' +
                        '<h2>' + $(this).find("title").text() + '</h2>' +
                        '<h3>' + $(this).find("engine").text() + ' Game / ' + $(this).find("platform").text() + '</h3>' +
                        '<p>' + $(this).find("description").text() + '</p>' +
                        '<br>' +
                        '<p><span class="highlight">Contributions:</span></p>' +
                        '<ul>' +
                        roles +
                        '</ul>' +
                        links +
                        '</div>' +
                        '<div class="col-xs-12 col-md-6 col-lg-4">' +
                        '<br class="visible-xs visible-sm">' +
                        '<a href="' + url + '">' +
                        '<img class="game-img img-responsive img-thumbnail" ' +
                        'src="' + $(this).find("image").find("src").text() + '" ' +
                        'alt="' + $(this).find("title").text() + '" ' +
                        'title="' + $(this).find("title").text() + '">' +
                        '</a>' +
                        '</div>' +
                        '</div>';
                    $("#expandGames").append(toAppend);
                });
            }
        });
    }
};

var app =
{
    generateLayout: function ()
    {
        app.createHead();
        app.createHeader();
        app.createBanner();
        app.createFooter();
    },

    updateTitle: function ()
    {
        $("title").html(name);
    },

    createHead: function ()
    {
        // Append favicon to head
        var toAppend = '<link rel="shortcut icon" type="image/ico" href="favicon.ico">';
        $("head").append(toAppend);

        // Update title according to name variable
        app.updateTitle();
    },

    createHeader: function ()
    {
        // Prepend header to body
        var toPrepend = '<header> ' +
            '<div> ' +
            '<a href=""> ' +
            '<img id="logo" src="img/petraller_studios.png" title="Petraller Studios" alt="Petraller Studios logo"> ' +
            '</a> ' +
            '<nav class="visible-md visible-lg"> ' +
            '</nav> ' +
            '</div> ' +
            '</header>';
        $("header").remove(); // Remove old header
        $("body").prepend(toPrepend);

        // Create navLink for each anchor
        $("a.anchor").each(function ()
        {
            var name = $(this).attr("name");
            var toAppend = '<div class="navLink">' + name + '</div>';
            $("header nav").append(toAppend);
        });

        // Add navLink on click functionality
        $(".navLink").on("mousedown", function ()
        {
            scrollTo(this.innerHTML);
        });
    },

    createBanner: function ()
    {
        // Insert banner after home anchor
        var toInsert = '<section style="height:0; padding:0"><div role="presentation" id="banner"></div></section>';
        $('section:first-of-type').remove();
        $(toInsert)
            .insertAfter(".anchor[name='Home']")
            .delay(500)
            .animate({
                height: '480px',
            }, {
                easing: 'easeInOutCirc',
                duration: 1000,
            });
    },

    createFooter: function ()
    {
        // Find copyright year range
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

        // Append footer to body
        var toAppend = '<footer role="contentinfo"> ' +
            '<div>Copyright &copy; ' + str + ' Clarence "Petraller" Tay</div> ' +
            '</footer>';
        $("footer").remove(); // Remove old footer
        $("body").append(toAppend);
    },
};

var name = "404";

function init()
{
    app.generateLayout();
    banner.init();
    games.load();
}

function scrollTo(name)
{
    var target = $("a[name='" + name + "'");
    $('html, body')
        .clearQueue()
        .animate({
            scrollTop: target.offset().top - $('body').offset().top - $("header").height()
        }, {
            easing: 'easeInOutCirc',
            duration: 500,
        });
}

window.onload = function ()
{
    init();
};