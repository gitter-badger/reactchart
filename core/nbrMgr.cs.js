var pow   = Math.pow;
var floor = Math.floor;
var log   = Math.log;
var min   = Math.min;
var max   = Math.max;
var abs   = Math.abs;
var LN10  = Math.LN10;

var m = {};

// distance methods
m.orderMag = function(r){
	if(r < 0){
		r = -r;
	}
	return floor( log(r) / LN10);
};

m.roundUp = function(r){
	var cand = 5 * pow(10,m.orderMag(r));
	return (r >  cand)?2 * cand:cand;
};

m.roundDown = function(r){
	return pow(10,m.orderMag(r));
};

m.multiply = function(d,f){
	return d * f;
};

m.divide = function(d,f){
	return d / f;
};

m.increase = function(d1,d2){
	return d1 + d2;
};

m.offset = function(/*d*/){
	return null;
};

// value methods
m.closestRoundUp = function(ref,om){

	if(ref < 0){
		return - m.closestRoundDown(-ref,om);
	}

	var refOm = m.orderMag(ref);
	if(refOm === om){
		return m.roundUp(ref);
	}else if(refOm > om){
		var step = pow(10,om);
		var i = 1;
		while(step * i < ref){
			i++;
		}
		return step * i;
	}else{
		return pow(10,om);
	}
};

m.closestRoundDown = function(ref,om){

	if(ref < 0){
		return - m.closestRoundUp(-ref,om);
	}

	var refOm = m.orderMag(ref);
	if(refOm === om){
		return m.roundDown(ref);
	}else if(refOm > om){
		// closest up at refOm
		var start = pow(10,refOm);
		var s = 1;
		while(start * s < ref){
			s++;
		}
		// closest down at om
		var step = pow(10,om);
		start *= s;
		var i = 1;
		while(start - step * i > ref){
			i++;
		}
		return start - step * i;
	}else{
		return 0;
	}
};

m.closestRound = function(ref,om,type){
	return (type === 'up')? m.closestRoundUp(ref,om):m.closestRoundDown(ref,om);
};

m.min = function(values){
	return min.apply(null,values);
};

m.max = function(values){
	return max.apply(null,values);
};

m.label = function(value, useless, fac){
	var out = (value / fac).toFixed(2);
	return out;
};

// value & distance methods
m.add = function(d1,d2){
	return d1 + d2;
};

m.subtract = function(d1,d2){
	return d1 - d2;
};

m.distance = function(d1,d2){
	return abs(d1 - d2);
};

module.exports = m;
