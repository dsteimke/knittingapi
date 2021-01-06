# Knitting Pattern API

## What is this thing?
When I first started knitting, I desperately wanted to make a pair of basic mittens. Sounds
easy right? When I searched for a pattern I liked each one I found had some sort of 
detail that intimidated me - colorwork, cables, or a stitch pattern I didn't want to keep
track of. I tried knitting them on my own, I knew that I'd need to increase as I went for the
thumb stitches...but I had no idea how to separate the thumb and would end up knitting an odd
cone over and over again. I got frustrated and to this day I still haven't made myself that pair
of basic mittens, even though I've made cabled sweaters and done extensive colorwork and even
have written my own sweater pattern with those stitch patterns I didn't want to keep track
of. I ran into the same issue with socks (it seems like every other knitter just somehow intuitively 
knew how to knit them), gloves (I still haven't found a pattern for a pair with no embellishments), 
and sweaters (I've knit enough that I just make up the pattern as I go along now). All except for hats - 
for whatever reason there are a million basic hat patterns. 

Now that I'm a more experienced knitter and I have quite a few of these garments under my belt
I've started branching out into knitting for friends and family. But without the ability to try
an in-progress sock or sweater on the person I'm knitting for whenever I want I'm left guessing about 
the sizing. I'd much rather be able to take someone's measurements or shoe size and translate that into 
an easy pattern so I can grab some needles and start knitting without having to do a ton of math first. 

I'm also a less is more kind of girl so the idea of making a ton of intricate things doesn't appeal
to me - I want something timeless, that I can throw on whenever the mood strikes (or more realistically
whenever I get cold).

Enter the knitting API. Calculations for the most basic form of garments, in 
fully customizeable sizing. The patterns require a swatch and some basic measurements
and do all the knitting math for you so you can just cast on and go.

## Knitting terminology
If you're unfamilir with knitting there are some definitions that may help.

Swatch: A sample that is knit before the real knitting starts. The knitter will make a note
of the needle size and knit a small square (usually a little larger than 4"x4"). The sample is
then soaked in water, pinned into shape, and then left to dry to determine knitting gauge.

Gauge: The rows per inch and stitches per inch of a particular yarn and needle combination for
a knitter. Two knitters knitting with exactly the same yarn and exactly the same needles may not 
produce swatches that have the same gauge. This is why none of the patterns have recommended
needle sizes listed; the knitter is free to choose a yarn they like and play with the pattern gauge
until they find something they like with that yarn.

Rib Repeat: The number of stitches that the rib stitch pattern occurs over. A 2x2 (pronounced "two by two") 
rib repeat is two knit stitches followed by two purl stitches, repeated over the row of stitching until the end is
reached. If the knitting is done in the round it's important that the total number of stitches is divisible
by the rib repeat - so for our 2x2 example the total stitches in the stitch pattern is 4 and the total stitches
on the needles should be divisible by 4. There are no real rules in knitting though so it's more of a suggestion than
anything. However all the patterns in the knitting API have been adjusted to ensure that the rib repeat comes out 
evenly.

In the round: This describes a style of knitting where the knitter makes a continuous tube of knitting
rather than knitting back and fourth (like a typewriter) producing a flat piece.

## Endpoints

### /knitting/sock/v1
This pattern is a basic cuff down sock pattern. Enter the foot length and circumference of the sock recipient. The
sock cuff (portion above the heel) is the same length as the foot length, minus the heel. 

#### The Math
Sock math is straightforward - you need your stitches per inch and you knit until it fits your foot. The cuff of the 
sock (above the heel) is largely determined by personal preference, and I like my socks to be able to be folded in half
perfectly at the heel. Yarn is also less elastic than commercial socks so the extra fabric around the ankle helps keep
the sock from sliding down. The sock is the knit until it's 2" less than the desired final length, then the toe is
knit. 

#### Example Request Body
{
	"swatch": {
		"stitchesPerInch": 6,
		"rowsPerInch": 6
	},
	"measurements": {
		"footCircumference": 7,
		"footLength": 4
	},
    "ribRepeat": "1x1"
}

### /knitting/gloves/v1
This pattern is coming soon!

### /knitting/hat/v1
This pattern is a basic hat with ribbing at the bottom.

#### The Math
Hats are simple, needing only one measurement - the circumference of your head. That multiplied by the stitches per inch
is the 

#### Example Request Body
{
	"swatch": {
		"stitchesPerInch": 8,
		"rowsPerInch": 6
	},
	"measurements": {
		"headCircumference": 22
	},
    "ribRepeat": "2x2"
}

### /knitting/sweater/v1
A top down raglan sweater knit seamlessly.

#### Example Request Body
{
	"swatch": {
		"stitchesPerInch": 8,
		"rowsPerInch": 6
	},
	"measurements": {
		"neck": 13.5,
		"torso": 40,
		"heightFromUnderarms": 12,
		"armLength": 22,
		"armCircumference": 13,
		"wrist": 6.5
	},
    "ribRepeat": "2x2"
}

### /knitting/mittens/v1
A single mitten (repeat instructions for a pair) knit from the cuff up.

#### Example Request Body
{
	"swatch": {
		"stitchesPerInch": 8,
		"rowsPerInch": 6
	},
	"measurements": {
		"handCircumference": 7,
		"handLength": 10,
		"wristToThumb": 2.5,
		"thumbCircumference": 2,
		"thumbLength": 2
	},
    "ribRepeat": "1x1"
}
