import {EndorsementLike} from './endorsement-like';
import {EndorsementLinks} from './endorsement-links';

export class Endorsement {
    public granterUsername: string;
    public receiverUsername: string;
    public categories: string[];
    public endorsementLikes: EndorsementLike[];
    public score: number;
    public reason: string;
    public url: string;
    public created: string;
    public id: string;
    public _links: EndorsementLinks;
}
