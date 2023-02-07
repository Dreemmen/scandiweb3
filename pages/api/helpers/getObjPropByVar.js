export default function getObjPropByVar(object, path){
    return path.split('.').reduce ( (res, prop) => res[prop], object );
}