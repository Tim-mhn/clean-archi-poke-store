import Sinon, { SinonStubbedInstance } from "sinon";

class DocumentRepository {

    constructor() { };
    public create(): void {
        console.log('created');
    };
    public delete(): void {
        console.log('deleted');
    }

}


class DocumentController {
    username;
    docRepo;
    constructor(username: string, docRepo: DocumentRepository) {
        this.username = username;
        this.docRepo = docRepo;
    }


    public test() {
        this.docRepo.create();
    }
}



describe('test sinon', () => {

    it('should work', () => {
        let documentRepository: SinonStubbedInstance<DocumentRepository>;
        documentRepository = Sinon.createStubInstance(DocumentRepository);
        const documentsController = new DocumentController(
                "aaaaa",
                documentRepository as unknown as DocumentRepository);
        
                documentsController.test();
        Sinon.assert.calledOnce(documentRepository.create);

    })
})