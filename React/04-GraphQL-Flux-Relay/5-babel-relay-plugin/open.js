'use strict';

import open from 'open';
import projectConfig from './project.config';

open(`http://localhost:${projectConfig.port}`);
