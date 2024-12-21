import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Title = "An awesome blog post title !!";
const Description = "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.";
const Image = "https://imgbox.com/oEbE9dkq";
const ImageText = "An inspiring picture";
const LinkText = "continue reading";
const Author = "A.I";
const Label = "main";
const Date = "08-10-2024";
const Tags = "Not tagged";
const Data = {
    "time": 1728384512132,
    "blocks": [
        {
            "id": "JoLRomV5xL",
            "type": "paragraph",
            "data": {
                "text": "Post content"
            }
        }
    ],
    "version": "2.30.5"
};


export class Post {
    constructor({title = Title, summary = Description, date = Date,image=Image,imageText=ImageText, linkText=LinkText, author=Author,label=Label,data=Data, category=sections[0].title,tags=Tags, comments=[]} = {}) {
        this.title = title;
        this.date = date;
        this.description = summary;
        this.image = image;
        this.imageText = imageText;
        this.linkText = linkText;
        this.author = author;
        this.label = label;
        this.data = data;
        this.category = category;
        this.tags = tags;
        this.comments = comments;
    }
};

export const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
  ];


export const sidebar = {
    title: 'About',
    description:
      'This is my blog site, developed by yours only',
    archives: [
      { title: 'October 2024', url: '#' },
      { title: 'November 2024', url: '#' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'X', icon: XIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };
  

