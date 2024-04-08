import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CurrentTranscriptContext from "../CurrentTranscriptContext";
import '../App.css';

export default function UploadPage(props) {

    const [file, setFile] = useState(0);
    const [fileFormatTextClass, setFileFormatTextClass] = useState("text-muted");
    const [italicSwitchState, setItalicSwitchState] = useState(false);
    const [aiSwitchState, setAISwitchState] = useState(true);
    const [transcriptionMode, setTranscriptionMode] = useState('verbatim');
    const [transcript, setTranscript] = useContext(CurrentTranscriptContext);
    const validFileFormats = ['srt', 'scc'];
    let navigator = useNavigate();

    const handleFileUpload = (e) => {
        e.preventDefault();
        const files = e.target.files;
        const fileName = files[0].name;
        if (validFileFormats.includes(fileName.split(".")[1])) {
            setFileFormatTextClass("text-muted");
            setFile(files[0]);
        } else {
            setFileFormatTextClass("text-danger");
            setFile(0);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('ai', aiSwitchState);
        formData.append('italics', italicSwitchState);
        formData.append('transcriptionMode',)

        fetch('http://localhost:5000/api/upload', {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(text => setTranscript(text))

        navigator("/viewer");
    }

    return (
        <div>
            <h1>Upload</h1>
            <div className="center-card">
                <Form>
                    <Form.Group>
                        <Form.Label style={ { marginBottom: "1.5rem" } }>Caption File</Form.Label>
                        <Form.Control type="file" className="caption-upload" onChange={handleFileUpload}></Form.Control>
                        <Form.Text className={fileFormatTextClass}>Accepts only SRT and SCC caption files.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={ { marginTop: "1.5rem" } }>Transcription Options</Form.Label>
                        <div className="labeled-switch">
                            <Form.Check
                                inline
                                name="verbatim-choice"
                                type='radio'
                                value='verbatim'
                                checked={transcriptionMode == 'verbatim'}
                                onChange={() => setTranscriptionMode('verbatim')}
                            />
                            <p className="radio-label">Verbatim</p>
                            <Form.Check
                                inline
                                disabled={!aiSwitchState}
                                name="verbatim-choice"
                                type='radio'
                                value='non-verbatim'
                                checked={transcriptionMode == 'non-verbatim'}
                                onChange={() => setTranscriptionMode('non-verbatim')}
                            />
                            <p className={aiSwitchState ? "radio-label" : "muted-radio-label"}>Non-Verbatim</p>
                        </div>
                        <div className="labeled-switch">
                            <Form.Check 
                                defaultChecked={aiSwitchState} 
                                onChange={() => {setAISwitchState((old) => !old); setTranscriptionMode('verbatim')}} 
                                type="switch"
                            />
                            <p className="option-label">Enable AI usage?</p>
                        </div>
                        <div className="labeled-switch">
                            <Form.Check 
                                defaultChecked={italicSwitchState} 
                                onChange={() => setItalicSwitchState((old) => !old)} 
                                type="switch"
                            />
                            <p className="option-label">Italicize non-verbal cues?</p>
                        </div>
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="outline-dark" disabled={file == 0} style={ { marginTop: "1.5rem" } }>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );

}