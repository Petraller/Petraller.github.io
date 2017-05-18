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
            'text': "Nice of you to stop by petraller.github.io",
            'duration': 3000,
        },
        {
            'text': "Development in progress :)",
            'duration': 3000,
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
        $(banner.dom).click(function (e)
        {
            banner.next();
        });
    },

    next: function ()
    {
        // Increment
        banner.index = (banner.index + 1) % banner.content.length;

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

    // Initialise
    init: function ()
    {
        app.initMarquees();

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
                    app.marquees[type].init(data);
                });
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
    },
};

window.onload = function ()
{
    app.init();
};