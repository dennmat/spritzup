function openDialog(callback, accepted_types='.sprtr') {
	$('#fileDialog').attr('accept', accepted_types);
	$('#fileDialog').unbind('change');
	$('#fileDialog').click();
	$('#fileDialog').change(callback);
}

function saveDialog(callback, accepted_types='.sprtr') {
	$('#saveFileDialog').attr('accept', accepted_types);
	$('#saveFileDialog').unbind('change');
	$('#saveFileDialog').click();
	$('#saveFileDialog').change(callback);
}

function generateId() {
	var charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
	var result = "";

	for(var i = 0; i < 10; i++) {
		result += charSet.charAt(Math.floor(Math.random() * charSet.length));
	}
	
	return result;
}

class Rect {
	constructor(x=0, y=0, w=0, h=0) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.x2 = this.x + this.w;
		this.y2 = this.y + this.h;
	}

	updateDeltas() {
		this.x2 = this.x + this.w;
		this.y2 = this.y + this.h;
	}

	toDict() {
		this.updateDeltas();
		return {x:this.x, y:this.y, w:this.w, h:this.h};
	}

	fromDict(dict) {
		this.x = dict.x;
		this.y = dict.y;
		this.w = dict.w;
		this.h = dict.h;
		this.updateDeltas();
		return this;
	}

	hasIntersect(other_rect) {
		this.updateDeltas();
		return !!(
			this.x < other_rect.x2 && this.x2 > other_rect.x &&
			this.y < other_rect.y2 && this.y2 > other_rect.y
		);
	}

	pointInRect(x, y) {
		this.updateDeltas();
		return (
			this.x <= x && x <= this.x2 &&
			this.y <= y && y <= this.y2
		);
	}

	removeZoom(zoom) {
		this.x /= parseFloat(zoom);
		this.y /= parseFloat(zoom);
		this.w /= parseFloat(zoom);
		this.h /= parseFloat(zoom);
		this.updateDeltas();
	}

	adjustToZoom(zoom) {
		this.x *= parseFloat(zoom);
		this.y *= parseFloat(zoom);
		this.w *= parseFloat(zoom);
		this.h *= parseFloat(zoom);
		this.updateDeltas();
	}

	add(otherRect) {
		this.x += otherRect.x;
		this.y += otherRect.y;
		this.w += otherRect.w;
		this.h += otherRect.h;
		this.updateDeltas();
		return this;
	}

	substract(otherRect) {
		this.x -= otherRect.x;
		this.y -= otherRect.y;
		this.w -= otherRect.w;
		this.h -= otherRect.h;
		this.updateDeltas();
		return this;
	}

	toCss() {
		this.updateDeltas();
		return {
			left: this.x.toString() + 'px',
			top: this.y.toString() + 'px',
			width: this.w.toString() + 'px',
			height: this.h.toString() + 'px'
		};
	}

	copy() {
		return new Rect(this.x, this.y, this.w, this.h);
	}
}

var Orient = {
	"UP": 0,
	"RIGHT": 1,
	"DOWN": 2,
	"LEFT": 3
};

var KeyCodes = {
	"UP": 38,
	"DOWN": 40,
	"LEFT": 37,
	"RIGHT": 39
};

module.exports = {
	"openDialog": openDialog,
	"saveDialog": saveDialog,
	"generateId": generateId,
	"Rect": Rect,
	"KeyCodes": KeyCodes,
	"Orient": Orient
};