// MARQUEE BEGIN

function Marquee(id)
{
    this.dom = $("#" + id)[0];

    this.domsInner = [];
    this.xs = [];
    this.width = 0;

    this.domTooltip = null;

    this.baseSpeed = 0.05;
    this.clickSpeed = 0.4;
    this.hoverSpeed = 0;
    this.speed = this.baseSpeed;

    this.click = false;
    this.hover = false;

    this.iterations = 2;
}

Marquee.prototype.init = function (data)
{
    $(this.dom).empty();

    // Create item holders
    for (var i = 0; i < this.iterations; i++)
    {
        this.domsInner[i] = $("<div class='marquee-inner'></div>");
        $(this.dom).append(this.domsInner[i]);
        this.xs[i] = 0;
    }

    // Create items
    var left = 0;
    for (var i in data)
    {
        // Create dom
        var item = i;
        var info = data[i];
        var newDom = $("<p class='marquee-item'></p>");
        $(newDom)
            .html(item)
            .css({
                'color': 'hsl(210,80%,' + (Math.floor(Math.random() * 3) * 20 + 20) + '%)',
                'left': left,
            })
            .attr("data-info", info);

        // Append dom
        var appendedDom = null;
        for (var i = 0; i < this.iterations; i++)
        {
            appendedDom = newDom.clone();
            $(this.domsInner[i]).append(appendedDom);
        }

        // Increase left
        left += $(appendedDom).width() + 80;
    }

    // Offset second item holder
    for (var i = 0; i < this.iterations; i++)
    {
        var inner = this.domsInner[i];
        this.xs[i] = left * i;
        $(inner).css({
            'left': this.xs[i],
        });
    }
    this.width = left;

    // Create tooltip
    this.domTooltip = $("<div class='marquee-tooltip'><p></p></div>");
    $(this.domTooltip).attr('id', $(this.dom).attr('id') + '-tooltip');
    $(this.dom).after(this.domTooltip);

    this.handlers();
};

Marquee.prototype.update = function (dt)
{
    // Get speed
    if (!this.click && !this.hover)
    {
        this.speed = this.baseSpeed;
    }
    else if (this.click)
    {
        this.speed = this.clickSpeed;
    }
    else if (this.hover)
    {
        this.speed = this.hoverSpeed;
    }

    for (var i = 0; i < this.iterations; i++)
    {
        // Move
        this.xs[i] -= dt * this.speed;
        if (this.xs[i] < -this.width)
        {
            this.xs[i] += this.iterations * this.width;
        }

        // Draw
        $(this.domsInner[i]).css({
            'left': this.xs[i],
        });
    }
};

Marquee.prototype.handlers = function ()
{
    var foo = this;
    $(this.dom)
        .mousedown(function (e)
        {
            if (e.button == 0)
                foo.click = true;
        })
        .mouseup(function (e)
        {
            if (e.button == 0)
                foo.click = false;
        })
        .mouseover(function (e)
        {
            foo.hover = true;
        })
        .mouseout(function (e)
        {
            foo.hover = false;
        });

    $(this.dom).find('.marquee-item')
        .mouseover(function (e)
        {
            if ($(this).data('info') == '')
            {
                return;
            }
            $(foo.domTooltip)
                .css({
                    "height": '20vmin',
                })
                .find('p').html($(this).data('info'));
        })
        .mouseout(function (e)
        {
            $(foo.domTooltip).css({
                "height": '0',
            });
        });
};

// MARQUEE END

// CAROUSEL BEGIN

function Carousel(id)
{
    this.dom = $("#" + id)[0];
    this.domLeft = null;
    this.domNav = null;

    this.index = 0;

    this.content = null;

    this.nextTimer = 0;
    this.nextTime = 8000;
}

Carousel.prototype.init = function (data)
{
    $(this.dom).empty();

    // Regenerate structure
    var append = $(
        '<div class="carousel-previous">&lsaquo;</div>' +
        '<div class="carousel-next">&rsaquo;</div>' +
        '<div class="carousel-nav"></div>' +
        '<div class="carousel-content"><div class="carousel-left"></div></div>');
    $(this.dom).append(append);
    this.domLeft = $('.carousel-left')[0];
    this.domNav = $('.carousel-nav')[0];

    // Create items
    this.content = [];
    var index = 0;
    for (var i in data)
    {
        // Create dom
        var item = i;
        var info = data[i];
        var newDom = $("<a class='carousel-item'></a>");
        var newImg = $("<img>");
        $(newImg).attr('src', './img/' + info['image']);
        $(newDom).append(newImg).css({'left': (index++ * 100) + '%'}).attr('href', info['link']);
        $(this.dom).find('.carousel-left').append(newDom);

        // Create pagination
        var newPageDom = $("<div class='carousel-nav-page'>&bull;</div>");
        $(this.dom).find('.carousel-nav').append(newPageDom);

        // Add to content
        this.content.push(newDom);
    }

    // Active page 1
    $(this.dom).find('.carousel-nav-page').eq(0).addClass('carousel-nav-page-active');

    this.handlers();
};

Carousel.prototype.update = function (dt)
{
    this.nextTimer += dt;
    if (this.nextTimer >= this.nextTime)
    {
        this.next();
    }
};

Carousel.prototype.previous = function ()
{
    // Increment
    this.index = (this.index + this.content.length - 1) % this.content.length;

    this.updateContent();
};

Carousel.prototype.next = function ()
{
    // Increment
    this.index = (this.index + 1) % this.content.length;

    this.updateContent();
};

Carousel.prototype.changePage = function (index)
{
    // Set
    this.index = index % this.content.length;

    this.updateContent();
};

Carousel.prototype.updateContent = function ()
{
    $(this.domLeft).css({
        'left': (-this.index * 100) + '%'
    });
    $(this.domNav).find('.carousel-nav-page')
        .removeClass('carousel-nav-page-active')
        .eq(this.index).addClass('carousel-nav-page-active');

    // Reset next timer
    this.nextTimer = 0;
};

Carousel.prototype.handlers = function ()
{
    var foo = this;
    $(this.dom).find('.carousel-content').click(function (e)
    {

    });
    $(this.dom).find('.carousel-nav-page').click(function (e)
    {
        foo.changePage($(this).index());
    });
    $(this.dom).find('.carousel-previous').click(function (e)
    {
        foo.previous();
    });
    $(this.dom).find('.carousel-next').click(function (e)
    {
        foo.next();
    });
};

// CAROUSEL END

// BANNER START

banner = {
    index: 0,
    spacingInterval: 20,
    opacityInterval: 0.4,
    timeoutFunc: null,

    dom: null,
    domBannerTop: null,

    content: [
        {
            'text': "Hi",
            'duration': 2000,
        },
        {
            'text': "I'm <span class='highlight-dark'>Petraller</span>",
            'duration': 2000,
        },
        {
            'text': "Game developer, web developer, dancer",
            'duration': 3000,
        },
        {
            'text': "I develop <span class='rainbow'>cool</span> stuff",
            'duration': 3000,
        },
        {
            'text': "Email <span class='highlight-dark'>me@petraller.com</span>",
            'duration': 3000,
        },
        {
            'text': "Tweet <span class='highlight-dark'>@petraller</span> on Twitter",
            'duration': 3000,
        },
        {
            'text': "Stalk <span class='highlight-dark'>@petralleryt</span> on Instagram",
            'duration': 3000,
        }
    ],

    init: function ()
    {
        banner.dom = $("#banner")[0];
        banner.domBannerTop = $("#banner-top")[0];

        // Create items
        for (var i in banner.content)
        {
            var data = banner.content[i];
            var newDom = $("<h1 class='banner-text'></h1>");
            $(newDom)
                .html(data['text'])
                .css({
                    'top': (50 + i * banner.spacingInterval) + '%',
                    'opacity': (1 - i * banner.opacityInterval),
                });
            $(banner.domBannerTop).append(newDom);
        }

        // Auto next
        banner.timeoutFunc = window.setTimeout(function ()
        {
            banner.next();
        }, banner.content[0]['duration']);

        // On click
        $(banner.dom)
            .mousedown(function (e)
            {
                if (e.button == 0)
                    banner.next();
                else if (e.button == 2)
                    banner.previous();
            })
            .contextmenu(function (e)
            {
                return false;
            });
    },

    previous: function ()
    {
        // Decrement
        banner.index = (banner.index + banner.content.length - 1) % banner.content.length;

        banner.updateBanner();
    },

    next: function ()
    {
        // Increment
        banner.index = (banner.index + 1) % banner.content.length;

        banner.updateBanner();
    },

    updateBanner: function ()
    {
        // Move texts
        $(banner.domBannerTop).css({
            'top': (-banner.index * banner.spacingInterval) + "%",
        });

        // Fade texts
        $('.banner-text').each(function (index, value)
        {
            $(value).css({
                'opacity': 1 - Math.abs(banner.index - index) * banner.opacityInterval,
            });
        });

        // Auto next
        if (banner.timeoutFunc)
        {
            window.clearTimeout(banner.timeoutFunc);
            banner.timeoutFunc = window.setTimeout(function ()
            {
                banner.next();
            }, banner.content[banner.index]['duration']);
        }
    },
};

// BANNER END

var app = {

    marquees: {
        language: null,
        framework: null,
        program: null,
    },

    carousels: {
        games: null,
    },

    // Initialise
    init: function ()
    {
        app.initMarquees();

        app.initCarousels();

        banner.init();

        window.setInterval(function ()
        {
            app.update(1000 / 60);
        }, 1000 / 60);
    },

    initMarquees: function ()
    {
        // Load marquee data
        $.ajax({
            url: "./files/Marquees.xml",
            method: "GET",
            success: function (e)
            {
                $(e).find("marquee").each(function (index, value)
                {
                    // Create marquee
                    var data = {};
                    var type = $(value).attr('type');
                    app.marquees[type] = new Marquee('marquee-' + type);

                    // Add items
                    $(value).find('item').each(function (index, value)
                    {
                        var name = $(value).attr('name');
                        data[name] = $(value).text();
                    });

                    // Init marquee with data
                    if (type == 'framework')
                        app.marquees[type].iterations = 3;
                    app.marquees[type].init(data);
                });
            }
        });
    },

    initCarousels: function ()
    {
        // Load game data
        $.ajax({
            url: "./files/Games.xml",
            method: "GET",
            success: function (e)
            {
                app.carousels.games = new Carousel('carousel-games');
                var data = {};
                $(e).find("game").each(function (index, value)
                {
                    // Add game
                    var game = {};
                    var name = $(value).attr('name');

                    // Add data
                    game['year'] = $(value).find('year').text();
                    game['engine'] = $(value).find('engine').text();
                    game['platform'] = $(value).find('platform').text();
                    game['description'] = $(value).find('description').text();
                    game['link'] = $(value).find('link').text();
                    game['image'] = $(value).find('image').text();
                    game['contributions'] = [];
                    $(value).find('role').each(function (index, value)
                    {
                        game['contributions'].push($(value).text());
                    });

                    // Append new game
                    data[name] = game;
                });
                app.carousels.games.init(data);
            }
        });
    },

    update: function (dt)
    {
        for (var i in app.marquees)
        {
            var marquee = app.marquees[i];
            marquee.update(dt);
        }
        for (var i in app.carousels)
        {
            var carousel = app.carousels[i];
            carousel.update(dt);
        }
    },
};

window.onload = function ()
{
    app.init();
};