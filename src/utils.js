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

class Rect {
	constructor(x=0, y=0, w=0, h=0) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.x2 = this.x + this.w;
		this.y2 = this.y + this.h;
	}

	toDict() {
		return {x:this.x, y:this.y, w:this.w, h:this.h};
	}

	hasIntersect(other_rect) {
		return !!(
			this.x < other_rect.x2 && this.x2 > other_rect.x &&
			this.y < other_rect.y2 && this.y2 > other_rect.y
		);
	}

	toCss() {
		console.log(this);
		return {
			left: this.x.toString() + 'px',
			top: this.y.toString() + 'px',
			width: this.w.toString() + 'px',
			height: this.h.toString() + 'px'
		};
	}
}

module.exports = {
	"openDialog": openDialog,
	"saveDialog": saveDialog,
	"Rect": Rect
};