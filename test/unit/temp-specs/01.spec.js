function plus(a, b) {

    function isValuabue(value) {
        return typeof value == "number" && /^-\d{2}|\d{2}/.test(value)
    }

    if ( isValuabue(a) && isValuabue(b) ) {
        return parseInt(a) + parseInt(b);
    }

    return "你输入的参数必须是两个两位数";
    // if(^/ $/)
}


describe("test plus", function () {

    it("test plus(12, 99) ", function () {
        expect(plus(12, 99)).to.equal(111);
    });

    it("test plus(-12, 99) ", function () {
        expect(plus(-12, 99)).to.equal(87);
        expect(plus(99, -12)).to.equal(87);
    });

    it("test plus('00', '00') ", function () {
        expect(plus('00', '00')).to.equal('你输入的参数必须是两个两位数');
    });


    it("test plus('ad', '00') ", function () {
        expect(plus('ad', '00')).to.equal('你输入的参数必须是两个两位数');
    });

    it("test plus('1', '100') ", function () {
        expect(plus('1', '100')).to.equal('你输入的参数必须是两个两位数');
    });
});