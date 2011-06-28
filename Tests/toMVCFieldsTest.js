module("toMvcFields");
test("throws if input is not an object", 1, function() {
	raises(function() {
		toMvcFields("string");
	});
});

test("object only", 1, function() {
	var target = {First: "Rumples", Last: "Bear"};
	var result = toMvcFields(target);
	equal(result, "First=Rumples&Last=Bear");
});

test("nested object", 1, function() {
	var target = {Name: {First: "Rumples", Last: "Bear"} };
	var result = toMvcFields(target);
	equal(result, "Name.First=Rumples&Name.Last=Bear");
});

test("arrays", 1, function() {
	var target = {Numbers: ["one", "two", "three"]};
	var result = toMvcFields(target);
	equal(result, "Numbers%5B0%5D=one&Numbers%5B1%5D=two&Numbers%5B2%5D=three");
});

test("object, array, boolean", 1, function() {
	var phone = [2,0,6,5,5,5,1,2,1,2];
	var target = {Name: {First: "Rumples", Last: "Bear", IsOriginal: true}, Phone: phone};
	var result = toMvcFields(target);
	var expected = "Name.First=Rumples&Name.Last=Bear&Name.IsOriginal=true&"
	for(var i = 0; i < phone.length; i++) {
		expected += "Phone%5B" + i + "%5D=" + phone[i] + "&";
	}
	expected = expected.substr(0, expected.length - 1);
	equal(result, expected);
});

test("object with array of objects", 1, function() {
	var target = {Name: {First: "Rumples", Last: "Bear"}, Organs: [
		{Name: "Heart", Status: "Unbroken"},
		{Name: "Brain", Status: "Gooey"}
	]};
	var result = toMvcFields(target);
	var expected = "Name.First=Rumples&Name.Last=Bear&Organs%5B0%5D.Name=Heart&Organs%5B0%5D.Status=Unbroken&Organs%5B1%5D.Name=Brain&Organs%5B1%5D.Status=Gooey"
	
	equal(result, expected);
});