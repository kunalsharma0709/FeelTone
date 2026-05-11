import sys
from TTS.api import TTS
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

tts = TTS(model_name="tts_models/multilingual/multi-dataset/xtts_v2")


def main():
    text = sys.argv[1]
    speaker_wav = sys.argv[2]
    language = sys.argv[3]
    output_path = sys.argv[4]

    tts.tts_to_file(
        text=text,
        speaker_wav=speaker_wav,
        language=language,
        file_path=output_path
    )

    print("Audio generated successfully")
    print(output_path)


main()