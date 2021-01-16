class OBJClass {
    char *value;
    OBJClass(const char const * _value) {
        value = _value; // it is better to actually copy this string
    }
}

void receiveObj(OBJClass obj) {
    // all changes made to obj will not impact the source of obj
}

// void receiveObj(OBJClass &obj)

void receiveObj(OBJClass * obj) {
    obj.value = "another string";
    // all changes made to obj will IMPACT the source of obj
    // but changing the pointer will result in no IMPACT
    obj = new OBJClass();
}

void changeObjSrc(OBJClass **objPtrPtr) {
    *objPtrPtr = new OBJClass();
}

int main() {
    OBJClass obj;
    obj.value = "initValue";

    receiveObj(obj);    // by value -> via stck
    receiveObj(&obj);   // by ref (address)

//
    OBJClass *objJS = new OBJClass(objJS);

    receiveObj(*objJS);    // by value -> via stck
    receiveObj(objJS);   // by ref (address)

    changeObjSrc(&objJS);    
}