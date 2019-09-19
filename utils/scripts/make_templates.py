#!/usr/bin/env python3
import os
from subprocess import Popen

def main():
    # Path of the <base>/scripts directory
    curr_dir = os.path.dirname(os.path.realpath(__file__))
    # Path of the directory with the handlbars templates
    handlebars_dir = os.path.join(curr_dir, '..', '..', 'renderer', 'handlebars')
    # Path to the output templates.js file
    templates_js_path = os.path.join(curr_dir, '..', '..', 'renderer', 'templates.js')

    # Create templates.js
    args = ['handlebars', handlebars_dir, '-f', templates_js_path]
    print(' '.join(args))
    process = Popen(args)
    process.wait()

if __name__ == '__main__':
    main()